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

class VideoProduct {
    constructor ({videoName, videoUrl, keywords, description, id, date}) {
        this.id = id();
        this.videoName = videoName;
        this.videoUrl = videoUrl;
        this.description = description;
        this.keywords = keywords.split(",");
        this.date = date()
    }
}

function StoreProduct ({productName, price, productImage, productDescription, keywords, id, date}) {
    this.productName = productName;
    this.price = price;
    this.productImage = productImage;
    this.productDescription = productDescription;
    this.keywords = keywords.split(",");
    this.stopList = true;
    this.quantity = 0;
    this.id = id();
    this.date = date()
}

export {RestorationProduct, StoreProduct, VideoProduct}
