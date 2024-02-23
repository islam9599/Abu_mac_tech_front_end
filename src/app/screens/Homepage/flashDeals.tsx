import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  ArrowBack,
  ArrowForward,
  Bookmark,
  BookmarkBorder,
  Favorite,
  FavoriteBorder,
  ShoppingCart,
  ShoppingCartRounded,
} from "@mui/icons-material";
import { Checkbox, Container, Rating, Stack, Typography } from "@mui/material";
import {
  FaShoppingCart,
  FaRegBookmark,
  FaStar,
  FaFireAlt,
} from "react-icons/fa";

import "../../../css/home.css";

const productData: any = [
  {
    id: 1,
    name: "Macbook Pro 16 inch M3 Pro",
    image:
      "https://cdn0.vox-cdn.com/hermano/verge/product/image/10207/236896_MacBook_Pro_16_M3_AKrales_0641.jpg",
    productType: "openBackHeadphones",
    price: 2999,
    rating: 5,
    timeLeft: 27,
    totalSales: 7479,
  },
  {
    id: 2,
    name: "DROP + SENNHEISER PC38X GAMING HEADSET",
    image:
      "https://www.apple.com/newsroom/images/2023/10/apple-unveils-new-macbook-pro-featuring-m3-chips/article/Apple-MacBook-Pro-2up-231030_Full-Bleed-Image.jpg.large.jpg",
    productType: "openBackHeadphones",
    price: 169,
    rating: 5,
    timeLeft: 24,
    totalSales: 6898,
  },
  {
    id: 3,
    name: "MASSDROP X SENNHEISER HD 58X JUBILEE HEADPHONES",
    image:
      "https://photos5.appleinsider.com/gallery/57189-116491-16-inch-MacBook-Pro-Space-Black-xl.jpg",
    productType: "openBackHeadphones",
    price: 170,
    rating: 4,
    timeLeft: 21,
    totalSales: 6347,
  },
  {
    id: 4,
    name: "MASSDROP X SENNHEISER HD 58X JUBILEE HEADPHONES",
    image:
      "https://static1.xdaimages.com/wordpress/wp-content/uploads/wm/2023/10/space-black-macbook-pro-5.jpg",
    productType: "openBackHeadphones",
    price: 170,
    rating: 4,
    timeLeft: 21,
    totalSales: 6347,
  },
];

const FlashCard = () => {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <ArrowBack />,
    prevArrow: <ArrowForward />,
  };

  return (
    <div>
      <Container>
        <Stack
          width={"100%"}
          height={"auto"}
          alignItems={"center"}
          mt={"50px"}
          justifyContent={"center"}
        >
          <Typography variant="h3" fontWeight={"bold"}>
            Hot Sale
          </Typography>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {productData.map((product: any) => {
              return (
                <div className="productList">
                  <div key={product.id} className="productCard">
                    <Stack flexDirection={"row"} className="icon-container">
                      <ShoppingCartRounded
                        className={"productCard__cart"}
                        sx={{ width: "29px", height: "24px" }}
                      />
                      <BookmarkBorder
                        className={"productCard__wishlist"}
                        sx={{ width: "29px", height: "24px" }}
                      />
                      <FavoriteBorder
                        className="productCard__fastSelling"
                        sx={{ width: "29px", height: "24px" }}
                      />
                      {/* <Checkbox
                    className="productCard__fastSelling"
                    // id={chosenProduct?._id}
                    // onClick={targetLikeProduct}
                    icon={
                      <FavoriteBorder sx={{ width: "29px", height: "24px" }} />
                    }
                    checkedIcon={
                      <Favorite
                        style={{ color: "red", width: "29px", height: "24px" }}
                      />
                    }
                    // checked={
                    //   chosenProduct?.me_liked &&
                    //   chosenProduct.me_liked[0]?.my_favorite
                    //     ? true
                    //     : false
                    // }
                    checked={false}
                  /> */}
                    </Stack>
                    <img
                      src={product.image}
                      alt="product-img"
                      className="productImage"
                    ></img>
                    <div className="productCard__content">
                      <h3 className="productName">{product.name}</h3>
                      <Stack
                        width={"100%"}
                        flexDirection={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <h3 style={{ color: "red" }}>30% off</h3>
                        <h2 style={{ textDecoration: "line-through" }}>
                          $1799
                        </h2>
                      </Stack>

                      <div className="displayStack__1">
                        <div className="productPrice">${product.price}</div>
                        <div className="productSales">
                          {product.totalSales} units sold
                        </div>
                      </div>
                      <div className="displayStack__2">
                        <div className="productRating">
                          <Rating
                            className="half_rating"
                            defaultValue={3.5}
                            precision={0.5}
                          />
                        </div>
                        <div className="productTime">
                          {product.timeLeft} days left
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
};

export default FlashCard;
