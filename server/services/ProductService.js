import models from "../models/index.js";
import { TGBot } from "../index.js";

class ProductService {
  async getAll() {
    try {
      const properties = await models.Product.find({
        isSold: false,
        isBooked: false,
        type: "Менторы",
      });
      return { status: 200, data: properties };
    } catch (e) {
      console.log(e);
      return { status: 500, data: e };
    }
  }

  async getBoughtProperties(userId) {
    try {
      const bought = await models.Sells.find({ user: userId });
      return { status: 200, data: { bought } };
    } catch (e) {
      return { status: 500, data: e };
    }
  }

  async getDeveloper(id) {
    try {
      if (!id) return { status: 400, data: "Id not specified", id };
      const developer = await models.Developer.findById(id);
      if (!developer) return { status: 404, data: "Developer not found" };
      return { status: 200, data: developer };
    } catch (e) {
      return { status: 500, data: e };
    }
  }

  async getAuthor(id) {
    try {
      if (!id) return { status: 400, data: "Id not specified", id };
      const teacher = await models.User.findById(id);
      if (!teacher) return { status: 404, data: "Teacher not found" };
      return { status: 200, data: teacher };
    } catch (e) {
      return { status: 500, data: e };
    }
  }

  async getById(id, userId = null) {
    try {
      if (!id) return { status: 400, data: "Id not specified", id };
      const [bought, reviewed] = await Promise.all([
        models.Sells.find({ user: userId, product: id }),
        models.Review.find({ user: userId, product: id })
      ])
      console.log("Bought: ", bought)

      const isBought = bought.length === 1 ? true : false;
      const isReviewed = reviewed.length === 1 ? true : false;
      const product = await models.Product.findById({
        _id: id
      });
      if (!product) return { status: 404, data: "Product not found" };

      if(isBought === false){
        product.lessons = product.lessons.slice(0, 5)
      }
      
      return { status: 200, data: { 
        isBought,
        isReviewed,
        ...product.toObject()
      } };
    } catch (e) {
      console.log(e);
      return { status: 500, data: e };
    }
  }

  async uploadImage() {}

  async getAllSales(page = 1, limit = 5, main) {
    const now = new Date();
    if (main == "true") {
      console.log("main");
      const properties = await models.Product.find({
        type: "Courses",
        onMainPage: true,
      })
        .skip((page - 1) * limit)
        .limit(limit);
      return { status: 200, data: properties };
    }
    console.log("main");
    const properties = await models.Product.find({
      type: "Courses"
    })
      .skip((page - 1) * limit)
      .limit(limit);
    return { status: 200, data: properties };
  }

  async getAllAuctions(page = 1, limit = 10, main) {
    const now = new Date();
    if (main == "true") {
      const properties = await models.Product.find({
        type: "Books",
        onMainPage: true,
      })
        .sort({ timer: 1 })
        .skip((page - 1) * limit)
        .limit(limit);
      return { status: 200, data: properties };
    }

    const properties = await models.Product.find({
      type: "Books",
    })
      .sort({ timer: 1 })
      .skip((page - 1) * limit)
      .limit(limit);
    return { status: 200, data: properties };
  }

  async getAllBusinesses(page = 1, limit = 5, main) {
    const now = new Date();
    if (main == "true") {
      const properties = await models.Product.find({
        saleType: "bussiness",
        isSold: false,
        isBooked: false,
        onMainPage: true,
        $or: [
          { isTimer: false },
          {
            isTimer: true,
            $or: [{ timer: { $exists: false } }, { timer: { $gte: now } }],
          },
        ],
      })
        .skip((page - 1) * limit)
        .limit(limit);
      return { status: 200, data: properties };
    }
    const properties = await models.Product.find({
      saleType: "bussiness",
      isSold: false,
      isBooked: false,
      $or: [
        { isTimer: false },
        {
          isTimer: true,
          $or: [{ timer: { $exists: false } }, { timer: { $gte: now } }],
        },
      ],
    })
      .skip((page - 1) * limit)
      .limit(limit);
    return { status: 200, data: properties };
  }

  async getAllInvestOffers(page = 1, limit = 5, main) {
    const now = new Date();
    if (main == "true") {
      const properties = await models.Product.find({
        saleType: "investOffer",
        isSold: false,
        isBooked: false,
        onMainPage: true,
        $or: [
          { isTimer: false },
          {
            isTimer: true,
            $or: [{ timer: { $exists: false } }, { timer: { $gte: now } }],
          },
        ],
      })
        .skip((page - 1) * limit)
        .limit(limit);
      return { status: 200, data: properties };
    }
    const properties = await models.Product.find({
      saleType: "investOffer",
      isSold: false,
      isBooked: false,
      $or: [
        { isTimer: false },
        {
          isTimer: true,
          $or: [{ timer: { $exists: false } }, { timer: { $gte: now } }],
        },
      ],
    })
      .skip((page - 1) * limit)
      .limit(limit);
    return { status: 200, data: properties };
  }

  async getFilteredProperties(filters, currentSort, page = 1, limit = 12) {
    try {
      const {
        type,
        price,
      } = filters;

      console.log(11, type)

      const sortCriteria = {};
      if (currentSort === "priceAscending") {
        sortCriteria.price = 1;
      } else if (currentSort === "priceDescending") {
        sortCriteria.price = -1;
      } else if (currentSort === "roiAscending") {
        sortCriteria.roi = 1;
      } else if (currentSort === "roiDescending") {
        sortCriteria.roi = -1;
      }

      const [minPrice, maxPrice] = price
        ? price.split("-").map(Number)
        : [0, 0];

      const directionConditions =
        type?.length > 0
          ? [{ type: { $in: type } }]
          : [];

      const priceConditions =
        price.length > 0 ? [{ price: { $gte: minPrice, $lte: maxPrice } }] : [];


      const filterConditions = {
        $and: [
          ...directionConditions,
          ...priceConditions
        ],
      };

      const finalFilterConditions = {
        ...filterConditions
      };

      const totalProperties = await models.Product.find(finalFilterConditions);
      const properties = await models.Product.find(finalFilterConditions)
        .sort(sortCriteria)
        .skip((page - 1) * limit)
        .limit(limit);

      return { properties, totalProperties: totalProperties.length };
    } catch (e) {
      console.log(e);
      return { status: 500, data: e };
    }
  }

  async getAllProperties(page = 1, limit = 12, currentSort) {
    try {
      const now = new Date();
      const query = {
        saleType: { $ne: "auccion" },
        isSold: false,
        isBooked: false,
        $or: [
          { isTimer: false },
          {
            isTimer: true,
            $or: [{ timer: { $exists: false } }, { timer: { $gte: now } }],
          },
        ],
      };

      let sortCriteria = {};

      if (currentSort === "priceAscending") {
        sortCriteria = { price: 1 };
      } else if (currentSort === "priceDescending") {
        sortCriteria = { price: -1 };
      } else if (currentSort === "roiAscending") {
        sortCriteria = { roi: 1 };
      } else if (currentSort === "roiDescending") {
        sortCriteria = { roi: -1 };
      }

      const totalProperties = await models.Product.find(query);
      const properties = await models.Product.find(query)
        .sort(sortCriteria)
        .skip((page - 1) * limit)
        .limit(limit);
      return { properties, totalProperties: totalProperties.length };
    } catch (e) {
      console.log(e);
      return { status: 500, data: e };
    }
  }

  async getCountProperties(filters) {
    try {
      const { type, isCompleted, price } =
        filters;

      const [minPrice, maxPrice] = price
        ? price.split("-").map(Number)
        : [0, 0];

      const directionConditions =
        type.length > 0
          ? [{ type: { $in: type } }]
          : [];

      const priceConditions =
        price.length > 0 ? [{ price: { $gte: minPrice, $lte: maxPrice } }] : [];


      const maxPriceProduct = await models.Product.findOne({})
        .sort({ price: -1 })
        .select("price")
        .exec();

      const now = new Date();
      const query = [];

      const countPromises = [
        models.Product.countDocuments(query),
        models.Product.countDocuments({
          $and: [
            ...query,
            { type: "Books" },
            ...priceConditions,
          ],
        }),
        models.Product.countDocuments({
          $and: [
            ...query,
            { type: "Courses" },
            ...priceConditions,
          ],
        })
      ];
      const [
        total,
        books,
        courses
      ] = await Promise.all(countPromises);
      return {
        status: 200,
        maxPrice: maxPriceProduct.price,
        count: {
          total, 
          books,
          courses
        },
      };
    } catch (e) {
      console.log(e);
      return { status: 500, data: e };
    }
  }
  async contact(userID, productId) {
    try {
      const newContact = await models.Contact.create({
        user: userID,
        product: productId,
      });

      try {
        console.log("sending tg notification");
        await TGBot.sendMessage(
          process.env.TG_CHAT_ID,
          `Новое уведомление! Лот: ${productId}`
        );
      } catch (e) {
        console.log("error sending tg notification");
        console.log(e);
      }

      await newContact.save();
      return { status: 200, data: newContact };
    } catch (e) {
      console.log(e);
      return { status: 500, data: e };
    }
  }
}

export default new ProductService();
