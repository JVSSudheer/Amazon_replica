import React, { useState, useRef } from "react";
import "./ProductsAdmin.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

interface ProductAttribute {
  name: string;
  value: string;
}

interface Product {
  id?: string;
  title: string;
  categories: string[];
  brand: string;
  price: number;
  image: File | string | null;
  attributes: ProductAttribute[];
}

const ProductsAdmin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product>({
    title: "",
    categories: [""],
    brand: "",
    price: 0,
    image: null,
    attributes: [
      { name: "color", value: "" },
      { name: "size", value: "" },
    ],
  });
  const [allCategories] = useState<string[]>([
    "electronics",
    "clothing",
    "books",
    "home",
    "beauty",
    "toys",
    "sports",
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [categoryInput, setCategoryInput] = useState("");

  const defaultAttributes = [
    { name: "color", value: "" },
    { name: "size", value: "" },
    { name: "weight", value: "" },
    { name: "material", value: "" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCurrentProduct({
        ...currentProduct,
        image: e.target.files[0],
      });
    }
  };

  const handleAttributeChange = (
    index: number,
    field: keyof ProductAttribute,
    value: string
  ) => {
    const updatedAttributes = [...currentProduct.attributes];
    updatedAttributes[index] = {
      ...updatedAttributes[index],
      [field]: value,
    };
    setCurrentProduct({
      ...currentProduct,
      attributes: updatedAttributes,
    });
  };

  const addAttribute = () => {
    setCurrentProduct({
      ...currentProduct,
      attributes: [...currentProduct.attributes, { name: "", value: "" }],
    });
  };

  const removeAttribute = (index: number) => {
    const updatedAttributes = [...currentProduct.attributes];
    updatedAttributes.splice(index, 1);
    setCurrentProduct({
      ...currentProduct,
      attributes: updatedAttributes,
    });
  };

  const handleAddCategory = (category: string) => {
    if (!currentProduct.categories.includes(category)) {
      setCurrentProduct({
        ...currentProduct,
        categories: [...currentProduct.categories, category],
      });
    }
  };

  const handleCategoryChange = (category: string) => {
    setCurrentProduct({
      ...currentProduct,
      categories: currentProduct.categories.filter((c) => c !== category),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      // Update existing product
      setProducts(
        products.map((p) =>
          p.id === editingId ? { ...currentProduct, id: editingId } : p
        )
      );
    } else {
      // Add new product
      const newProduct = {
        ...currentProduct,
        id: Date.now().toString(),
      };
      setProducts([...products, newProduct]);
    }

    // Reset form
    setCurrentProduct({
      title: "",
      categories: [""],
      brand: "",
      price: 0,
      image: null,
      attributes: [
        { name: "color", value: "" },
        { name: "size", value: "" },
      ],
    });
    setEditingId(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const editProduct = (product: Product) => {
    setCurrentProduct(product);
    setEditingId(product.id || null);
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const addDefaultAttribute = (attrName: string) => {
    const exists = currentProduct.attributes.some(
      (attr) => attr.name === attrName
    );
    if (!exists) {
      const defaultAttr = defaultAttributes.find(
        (attr) => attr.name === attrName
      );
      if (defaultAttr) {
        setCurrentProduct({
          ...currentProduct,
          attributes: [...currentProduct.attributes, { ...defaultAttr }],
        });
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="admin-container">
        <h1>Product Management</h1>

        <div className="admin-content">
          <div className="product-form">
            <h2>{editingId ? "Edit Product" : "Add New Product"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title:</label>
                <textarea
                  name="title"
                  value={currentProduct.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Image:</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageChange}
                  required={!editingId}
                />
                {currentProduct.image &&
                  typeof currentProduct.image === "string" && (
                    <img
                      src={currentProduct.image}
                      alt="Preview"
                      className="image-preview"
                    />
                  )}
              </div>

              <div className="form-group">
                <label>Categories:</label>
                <div className="categories-select-container">
                  {/* Display selected categories as tags */}
                  <div className="selected-categories">
                    {currentProduct.categories.map((category) => (
                      <span key={category} className="category-tag">
                        {category}
                        <button
                          type="button"
                          onClick={() => handleCategoryChange(category)}
                          className="remove-category"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>

                  {/* Category selection dropdown with add new option */}
                  <div className="dropdown-with-add">
                    <select
                      value=""
                      onChange={(e) => {
                        if (e.target.value) {
                          handleAddCategory(e.target.value);
                        }
                      }}
                      className="category-dropdown"
                    >
                      <option value="">Select a category...</option>
                      {allCategories
                        .filter(
                          (cat) => !currentProduct.categories.includes(cat)
                        )
                        .map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                    </select>

                    {/* Add new category input */}
                    <div className="add-category-input">
                      <input
                        type="text"
                        value={categoryInput}
                        onChange={(e) => setCategoryInput(e.target.value)}
                        placeholder="New category name"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (categoryInput.trim()) {
                            handleAddCategory(categoryInput.trim());
                            setCategoryInput("");
                          }
                        }}
                        disabled={!categoryInput.trim()}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Brand:</label>
                <div className="branch-select-container">
                  <input
                    type="text"
                    name="brand"
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Price ($):</label>
                <input
                  type="number"
                  name="price"
                  min="0"
                  step="0.01"
                  value={currentProduct.price}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="attributes-section">
                <label>Attributes:</label>

                <div className="default-attributes">
                  <span>Add default attributes: </span>
                  {defaultAttributes.map((attr) => (
                    <button
                      key={attr.name}
                      type="button"
                      onClick={() => addDefaultAttribute(attr.name)}
                      disabled={currentProduct.attributes.some(
                        (a) => a.name === attr.name
                      )}
                      className="default-attribute-btn"
                    >
                      {attr.name}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addAttribute}
                  className="add-attribute-btn"
                >
                  + Add Custom Attribute
                </button>

                {currentProduct.attributes.map((attr, index) => (
                  <div key={index} className="attribute-row">
                    <input
                      type="text"
                      placeholder="Attribute name"
                      value={attr.name}
                      onChange={(e) =>
                        handleAttributeChange(index, "name", e.target.value)
                      }
                      required
                    />
                    <input
                      type="text"
                      placeholder="Attribute value"
                      value={attr.value}
                      onChange={(e) =>
                        handleAttributeChange(index, "value", e.target.value)
                      }
                      required
                    />
                    <button
                      type="button"
                      onClick={() => removeAttribute(index)}
                      className="remove-attribute-btn"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <button type="submit" className="submit-btn">
                {editingId ? "Update Product" : "Add Product"}
              </button>
            </form>
          </div>

          <div className="product-list">
            <h2>Product List</h2>
            {products.length === 0 ? (
              <p>No products added yet.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Categories</th>
                    <th>Branch</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        {product.image && typeof product.image === "string" ? (
                          <img
                            src={product.image}
                            alt={product.title}
                            className="product-thumbnail"
                          />
                        ) : (
                          <div className="thumbnail-placeholder">No Image</div>
                        )}
                      </td>
                      <td>{product.title}</td>
                      <td>{product.categories.join(", ")}</td>
                      <td>{product.brand}</td>
                      <td>${product.price.toFixed(2)}</td>
                      <td>
                        <button
                          onClick={() => editProduct(product)}
                          className="edit-btn"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            product.id && deleteProduct(product.id)
                          }
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductsAdmin;
