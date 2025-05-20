import api from "./api";

interface Product{
    title: string;
    // imageName: string;
    // imageMimeType: string;
    // imageBase64: string;
    imageUrl: string;
    categories: string[];
    brand: string;
    price: number;
    attributes: Record<string, string>;
}

export const addProduct=async (product: Product) => {
    try{
        const response = await api.post("/products/add", {
            title: product.title,
            // imageName: product.imageName,
            // imageMimeType: product.imageMimeType,
            // imageBase64: product.imageBase64,
            imageUrl: product.imageUrl,
            categories: product.categories,
            brand: product.brand,
            price: product.price,
            attributes: product.attributes
        },{withCredentials: true});
        return response.data;
    }catch (error) {
        console.error("Error during adding product:", error);
        throw error;
    }
}

export const deleteProduct = async (id: string) => {
    try {
        const response = await api.delete(`/products/delete/${id}`, { withCredentials: true });
        return response.data;
    }
    catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
}

export const getAllProducts = async () => {
    try {
        const response = await api.get("/products/all", { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const getProductById = async (id: string) => {
    try {
        const response = await api.get(`/products/${id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        throw error;
    }
};