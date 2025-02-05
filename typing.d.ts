type Product = {
    quantity: number;
    image(image: React.JSX.Element): unknown;
    image: React.JSX.Element;
    inventory: number;
    _id: string;
    title: string;
    description: string;
    price: number;
    productImage: string;
    tags: string[];
    discountpercentage: number;
    isNew: boolean;
    slug: string;
}