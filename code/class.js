class RestorationProduct {
    constructor ({productName, productWeiht, ingredients, price, productImageUrl, keywords, id, date}) {
        this.id = id();
        this.productName = productName;
        this.productWeiht = productWeiht;
        this.ingredients = ingredients;
        this.price = price;
        this.productImageUrl = productImageUrl;
        this.keywords = keywords.split(",");
        this.stopList = true;
        this.quantity = 0;
        this.date = date()
    }
}

function StoreProduct ({productName, porductPrice, productImage, productDescription, keywords, id, date}) {
    this.productName = productName;
    this.porductPrice = porductPrice;
    this.productImage = productImage;
    this.productDescription = productDescription;
    this.keywords = keywords.split(",");
    this.id = id();
    this.date = date()
}


export {RestorationProduct, StoreProduct}