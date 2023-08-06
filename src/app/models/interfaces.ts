// Utilizando o site https://app.quicktype.io/ para transformar o JSon da API em Código de Interface TypeScript

// criada para representar o modelo de livro que desejo, deixando opcional, porque nao sabemos se virá preenchido
export interface Livro {
    title?:               string;
    authors?:             string[];
    publisher?:           string;
    publishedDate?:       string;
    description?:         string;
    previewLink?:         string;
    thumbnail?:           ImageLinks;
}

// direto do site
export interface VolumeInfo {
    title:               string;
    authors:             string[];
    publisher:           string;
    publishedDate:       string;
    description:         string;
    pageCount:           number;
    printType:           string;
    mainCategory:        string;
    categories:          string[];
    averageRating:       number;
    ratingsCount:        number;
    contentVersion:      string;
    imageLinks:          ImageLinks;
    language:            string;
    infoLink:            string;
    canonicalVolumeLink: string;
}

export interface ImageLinks {
    smallThumbnail: string;
    thumbnail:      string;
    small:          string;
    medium:         string;
    large:          string;
    extraLarge:     string;
}

// cada um dos itens retornados
export interface Item {
    volumeInfo: VolumeInfo
}

export interface LivrosResultado {
    items: Item[];
    totalItens: number;
}