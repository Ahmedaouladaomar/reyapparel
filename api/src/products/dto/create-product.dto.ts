export class CreateProductDto {
    name: string;
    price: number;
    description: string;
    collectionId: number;
    variants: any[];
    imageURL: string;
    imagesURL: string[];
}