import EcommerceClient from "./helper";
import convertImageUrl from "../utils/helpter";
import axios from "axios";

export const addToCartApi = async (product_id: any) => {
  try {
    const response = await EcommerceClient.post(
      `cart/addToCart/${product_id}`,
      {},
      {
        withCredentials: true,
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
  let response = { status: 500 };
  return response;
};
export const addToWishlistApi = async (product_id: any) => {
  try {
    const response = await EcommerceClient.post(
      `wishlist/addToWishlist/${product_id}`,
      {},
      {
        withCredentials: true,
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
  let response = { status: 500 };
  return response;
};
export const removeFromCartApi = async (product_id: any) => {
  try {
    const response = await EcommerceClient.delete(
      `cart/removeFromCart/${product_id}`,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
  let response = { status: 500 };
  return response;
};

export const deleteFromCart = async (product_id: any) => {
  try {
    const response = await EcommerceClient.delete(
      `cart/permenantremoveFromCart/${product_id}`,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
  let response = { status: 500 };
  return response;
};

export const fetchCart = async () => {
  try {
    const response = await EcommerceClient.get("/cart/getUserCart", {
      withCredentials: true,
    });
    if (response.status === 200) {
      const cartItems = response.data;
      for (const element of cartItems)
        element.images = convertImageUrl(String(element.images));

      return cartItems;
    }
  } catch (error) {
    console.log(error);
  }
  return [];
};
export const fetchWishlist = async () => {
  try {
    const response = await EcommerceClient.get("/wishlist", {
      withCredentials: true,
    });
    if (response.status === 200) {
      const cartItems = response.data;
      for (const element of cartItems)
        element.images = convertImageUrl(String(element.images));

      return cartItems;
    }
  } catch (error) {
    console.log(error);
  }
  return [];
};

export const removeFromWishlistApi = async (product_id: any) => {
  try {
    const response = await EcommerceClient.delete(
      `wishlist/removeFromWishlist/${product_id}`,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
  let response = { status: 500 };
  return response;
};

export const moveTocartFromWishlist = async (product_id: any) => {
  try {
    const response = await EcommerceClient.get(
      `wishlist/moveItemToCart/${product_id}`,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
  let response = { status: 500 };
  return response;
};

export const fetchItems = async (page: number, perPage: number = 10) => {
  const paginationData = {
    offset: (page - 1) * perPage,
    limit: perPage,
  };
  if (page === 0) paginationData.offset = 1;

  const response = await EcommerceClient.post(
    "product/productPerPage",
    paginationData,
    {
      withCredentials: true,
      headers: { "content-type": "application/json" },
    }
  );
  const data1 = response.data;
  for (const element of data1)
    element.images = convertImageUrl(String(element.images));
  return data1;
};

export const fetchSliderItems = async () => {
  try {
    const response = await EcommerceClient.get("product/fetchSliderProduct");

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSliderItemsImage = async () => {
  try {
    const response = await EcommerceClient.get("product/sliderProductsimage");

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchItemsAWS = async (page: number, perPage: number = 10) => {
  const offset = page === 0 ? 0 : (page - 1) * perPage;

  const paginationData = { offset: page == 0 ? 0 : offset };

  const response = await EcommerceClient.post(
    "product/productPerPage",
    paginationData,
    {
      withCredentials: true,
      headers: { "content-type": "application/json" },
    }
  );
  const data1 = response.data;
  return data1;
};
