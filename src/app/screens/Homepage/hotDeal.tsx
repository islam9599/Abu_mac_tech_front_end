import React, { useRef } from "react";
import "../../../css/home.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Typography from "@mui/material/Typography";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Container, Stack } from "@mui/system";
import { Box } from "@mui/material";

const infoData = [
  {
    id: 1,
    title: " Bizda muborak Ramozon oyi uchun maxsus chegirmalar && sovg'alar!",
    background:
      "https://www.apple.com/v/apple-events/home/ac/images/meta/overview__bcphzsdb4fpu_og.png?202310251522",
    discount: "10%dan 25%gacaha bolgan chegirmalar",
    img: "https://9to5mac.com/wp-content/uploads/sites/6/2023/04/AirPods-case-with-display-concept.jpg?quality=82&strip=all",
  },
  {
    id: 2,
    title: " Bizda har Juma kuni maxsus chegirmalar && sovg'alar!",
    img: "https://cdn.vox-cdn.com/thumbor/vxc6b36RJIa8t0q1FSrec1ytSLI=/0x0:1920x1080/1400x1050/filters:focal(960x540:961x541)/cdn.vox-cdn.com/uploads/chorus_asset/file/24515378/Samsung_Galaxy_S23_Camera_accessories.jpg",
    discount: "5%dan 15%gacaha bolgan chegirmalar",
    background:
      "https://media.sketchfab.com/models/bN0bKAa1QhKOhDYUprQRwqh61Qs/thumbnails/0cd871cffe6448e186d65ab1652bc553/9201dc8270ad4d999fa3af69a389f1db.jpeg",
  },
  {
    id: 3,
    title: " Bizda har Juma kuni maxsus chegirmalar && sovg'alar!",
    img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhIQEBAVFhUSFRYXFRUVFxAPGBgSFhkXFhgSFRUYHSghGR0lGxYWITEhJSkrLi4uFx8zODMsNygtLi0BCgoKDQ0ODg8PDysZFRkrNysrLTcrLSsrLSsrLSsrNysrKzcrKysrKys3KysrLSsrKysrKy0rKysrKysrKysrK//AABEIALIBGwMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABAEDBQYHAgj/xABLEAABAwEDBQsHCQYGAwEAAAABAAIRAwQSIQcxQVFhBRMXMnGBkZKx0dIiUnKhsrPwNDVTYoOTosHCBhQzQlRzI0NjgqPhRPHyJP/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAARAf/aAAwDAQACEQMRAD8A7KiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIrNqtdOnBq1GMDjAL3NZJiYE58AehUsVupVml1Gqyo0EgupubUAcM4Jac+KC+iIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiIOfZRN16NR1Cz06gdUp1Xl7QHYQx7TjEZ8MDrVrI0f8Gv8A3ndjVqG7Lid0bRJzV64GwS4x0krbsjf8Gv8A3ndjUHR0RQN2t2KNlp77aH3WkhoABc5zjJutaMSYBOwAlBPRadwlWLVW6tPxpwlWLVW6tPxoNxRadwlWLVW6tPxpwlWLVW6tPxoNxRadwlWLVW6tPxqnCVYtVbq0/Gg3JFp3CVYtVbq0/GnCVYtVbq0/Gg3FFp3CVYtVbq0/GnCVYtVbq0/Gg3FFpvCVYtVbq0/Gq8JVi1VurT8aDcUWm8JVi1VurT8acJVi1VurT8aDckWm8JVi1VurT8acJVi1VurT8aDckWm8JVi1VurT8acJVi1VurT8aDckREBERAREQEREBFDqW3GG9KsWm1PDHkOghriMBnAKFZNFj/3l40+oK/QtcmCIPqQSUREHDt36BbujWlrheq1nYtc0QS6IJziIMjWtqyN/wa3953Y1T8ptIBtmcAJNZwJ2b29QMjX8Gt/ed2NQdHXL8uLyGWQTgd/n/hHYT0rqC5dlyPk2T7ftoIOVAUo0XuRkRh/2rVW7hdiZ0ROYr2KDce92PIrZbDoGmP1aeYIJDRS03eKYi5xownZr0qO8NDgAWwQCYiMb2B25lc3gRM6c0npVtoxLdA7mn8ygkBtIgDC8TjNy7GjHOo7LsmbsYxmIi87NszepX6tkaAwhwJcJIBPk7Dj8Qo9MSMdHMgu2htOHFhGDZxug3oxAjbmShvc/4kRJmLs5zGfmVLTQDb0OBgTIJImJ06jhzJRpBxF4xLok5gJiTjoCDzaWtGLC3EuwF29dAPGA5lcYKUGYnRFyNOf1K3VZdzaDEzIK92ezNdncG4TJJAJ1bEFt7Wh0S0jDNBbMH15lKLKJDQ0sDtMwBmxxzZ1EeIga+fSO9exQbBx5B5WKDxSu6Y2TGbuV60Np4mnAi7E3Q44xhHx2KyRjGj/608wV42YBofeEkkXZN4AAQ6JzHHo2oKWfe/54zbM84z614rtaLpaWwZkCJAvN40bPzXkNkkHQve9ARBzjW7DYfjSgutFCMc+wUyNmlY+14PIaQQIxaZbm0Qr9NsiTs2aAfzV19EAkAzGmTjtzoPqlERAREQEREBRd0qkM5TClLF7rWgEBoMwZKCPQdKpulF1oIJBcA4Nc6mS2HSLzSDGHPCpZAve6tlD6TgXOF3ypabploOHIqyrZ+IIJIMxeJeYJMAuOJjNjqVHlUs1n3tgp3i67OLonEk4xyxzLxUcgzdnqXmh2sY8uYq4oW5Dpp8jndpKmqNNPyn0T+7Mqj/JqAxmm+N7z6OPPMsbkdoEWZzz/AJlR7uTG7G3irOZSPm+t6VL3rFAyTD/8FPlf7bkG6rl2XPiWT7ftoLqK5dlz4lk+37aCDk/7wNvQVbvy69jAj9WjnClU6Egulvk6CQ08wOdWKwF12Gg9iD3+8tgtjOQZumcARExmM+oKyx/lE4wefQ0ZuZXbJRDiBgJLscNE4DWcIA5EtlG4S3S1wE5tIHMUHqpamkNABF0Y4HHEmc3MrFF8Z55hPYpW59i3zyQWghs+VhOYAcpJA51FrNAIjXHKJCC5a7S10wIloEQc4bdnniedUoVg0gkTBmCCQcZgwrrLPLXv8wtBHpTj6vWFGI8sDk/UguWmuHEwIl0xEACZgbF6oWlrc7SfJIgg6REzszq46yxTFSRi6LukZ8fV8YxFYPKdsQKjwSInDm0juUhlraGuaWzeiCQ6RBnDlSpRADDM3hOaI8pzY/CekKPQGB5uwIBf5U4xhy/zaOdXzam3Q2NJM3TOIAieb1qlsoXLzZBgZxmzTgvNmo3sBnN465IkwNZMQNpQeGPxJxx5/Ur9a2NIaA2LrYwBxMk3jtxVm2U7pc3DyXESNkiQrlKjOAjAE9UEx6kFmi6BBnRmx0AaORX7TamvcXAXZjBoIGaFHqjFvxpartxB9VIiICIiAiIghboVjEDnWCacSsxbcS5Yi7xjtH59yqJ1hCmWilLHNGlpHSIUXc1ZMtSog1woNQrI2hqx1UKjIbiHyXD6xWSWK3FPGCyqy01nKT831vSpe9YoOSb5BT5X+25TcpPzfW9Kl71ihZJvkFP0qntuQbouW5dOLZOSv20F1Jcty6cWx/b9tBByTfHeb63eFUe9xBF3OI/mP5KZQFM8dzgdgDu0jb6lZQWW1CMInPnkHXmjaj3k4XYzazmx1I3jn40MUuoxgawtcS4zfEEAGcIOnA47QdEIIjapiLoPOe7BeajycSIjHSduOGxVoDPyn81ItjWibhJF3TOe7iMw0ygs78fNHS7wrxeM3o1YYxp0xtV+xNaS2+YbJk7JOw9ipbA0TdJi8IJ1SPjQgt78fNHS7wryHkEmMToxHQYxUmyhv85MXTEedGA5JUet/Ly9yD1vx80dLvCvDHluAE5tY0Rmg6lMoMYWvvOIcB5GeCcdQ5OkqI7jjkH6kB1QkEXQJ2k/kjahGEA59Y06o2qXcZcm8b88WMLuOM68yiM4zvjQEFHvLsCI5JP5L0Kx80HnPcrz2iGwZMeVsMmB0R0qxZ8x5fyCCj3E4kRHKdIOOGGZe9+Pmetx/SrtuawF4pklkG6TnIjTgMfjHOrdHNzntKD6sREQEREBERBBc2b/AKRWGtBhxbow6ce9Zd9W497Tmd5TeXM4diwdR8vJ1lXEZTc0LKLGWJZMHBNEW0rG1QshanLG1XIiZuSfKPIsssRuLxnHkWXUaaxlK+b63pUvesUHJL8gp8r/AG3KdlK+b63pUvesUHJN8gp8tT23IN1XLcunEsn2/bQXUly3LrxLH9t20EHI7r/O7PCqXX+d2eFTKVVoHlUw7HOS4YREYdKsILQpuzzjrn/rYFQOccL2bPxfCrytUhi741oKNY4ZjHQZ6WryC5w42B13RnGwbVOrOBuQ2LrQDg0ScSSSBjz6AFDsgw6OwIKG8BngbIPaEhx0yOYdgUm3vDi9zWBoIwaMwwjBUsbgCCWyMcMNonEEYZ8dSCO68BxsNl06No2KpY7SZ6B2BVtebnOrUVJoPAvS0OlpAnQ45ncyCI5zhAvZ83F2DzdqXHTM468NuzaVWtxm/GlqmMqNFNzSwFxIIfpAGcc6CFedMXsf9ubqoGuzzjrw7lUcfmUx9RpptaKYDhnfrEvMEf7gJ+qNkBCa5xnys2fi6yNWxA1wzGOg9oVaQxd8aXKdbazXEFlIMiZjGZ5tCDHguI42G26OwL1dcMJjZh+bUs+b41BX35zJkznxM7ccUH1SiIgIiICIiCFupZrzZGduZa6c8/E6lt5CwW6ljg3hz96Clkqwp/7xgsLTdCu78tMpForKDVeqvevNKmXOAGlRWa3Epw0nWsirdnphrQ0aFcUVrGUv5vrelS96xQMkvyCnyv8Abcp2Uv5vrelS96xQckvyCnyv9tyDdlyzLrxLJ9v20F1Ncuy6MO92R0YA1gTtO8kDoa7oKDkO8DWfw9y8vogAnUCdHcpDLbALQ+AZkYacD2KxUqgggHQUFG0gRPdrjUj6YAHKNWk7AvdGtdgh0EE/mqV6wdjMkkE9MlBWjZC+A1rnE6Gi8eYASrdRgEbcNGzUp+4+7NSzO3yi8NddumQ18iWughw1tHQoFR4JEHNiekIPW8DWfw9y8FgvR68J09ykMtkBzQ8AOzjDGP8A2VYLxemcMMet3hB6FAaz+HuVP3caz+HuXrfm+cE35vnBBTeBrP4e5N4Gs/h7lXfm6wm/N84IKbwNZ/D3JvA1n1dyrvzfOCpvrfOCAaI1n8PcqbwNv4e5V31usJvrdYQUNEbfw9ytwNWtXd9brCt957UH1oiIgIiICIiAvFSnIXtEGGtO52lvRoUGtYnkXS08xj1rZiF53tBr1n3NdAEQBrMrMWGxBmOnWpQYvSAiIg1fKX831vSpe9YoOSb5BT5antuU3KX831vSpe9YoWSb5BT5X+25Buyx+7249K10XUKzZacQdLXDM4HQc/SsgiDl1TJSJMVMOfvXngp/1B6+9dTRByzgp/1B6+9OCn/UHr711NEHLOCr649feqcFX1x6+9dURByzgq+v29688FX1+3vXVUQcr4Kj549feqcFf1+3vXVUQcq4K/r9venBX9ft711VEHKuCs+d296cFh87t711VEHKeCw+d296cFh8/t711ZEHKeC0+d296cFv1u1dWRAREQEREBERAREQEREBERAREQatlL+b63pUvesULJN8gp8r/bcpuUv5vrelS96xQsk3yCnyv9tyDdlVUWM3e3Co2tgp1zUuiY3urWoZ9dxwDv8AdKD3uhu7ZaGFa00mHzS9t7maMT0LX7XlJsDOK6pU9Flz3hatft+RqjibLbKtPZUDKo6W3T2rW7bkm3SYf8N9GqNjzTPQ8AetBvHCnZdFGpzmkOwlOFGzfQv6zFzd2TndYf8Aig8lWgf1KnB7ut/Sf8lDxIOknKlZtNJ3XpoMqVl+jd16a5w3J9urpsZ+9oD9Sqcn26n9EfvaHiQdI4T7N9E/rMThPs30T+sxc14P91v6Q/eUPEq8H+639IfvKHiQdJ4T7N9E7rMThOs30Tusxc24P91v6Q/eUPEnB/ut/SH7yh4kHSeE+zfRP6zE4T7N9E/rMXNuD/db+kP3lDxKrf2A3WBBFkzGf4lDxIOkcKFm+if1qazf7N/tfZrY51OkXNqNF64+7JZIBc0tJBAJE6cQuPV/2C3XeS91kxOgVKIzAY8b4hbjky/Ya12a0m12u6y7TcxlMOFRxc8iXOLcAABmkzOiMQ6eiIgIiICIiAiIgIiICIiAiIgIiICIiDVspfzfW9Kl71ihZJvkFPlf7blNyl/N9b0qXvWKFkm+QU+V/tuQbsiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiINWyl/N9b0qXvWKFkm+QU+V/tuREG7IiICIiAiIgIiICIiAiIgIiICIiAiIgIiIP//Z",
    discount: "5%dan 15%gacaha bolgan chegirmalar",
    background:
      "https://w0.peakpx.com/wallpaper/579/938/HD-wallpaper-microsoft-blue-logo-blue-brickwall-microsoft-logo-brands-microsoft-neon-logo-microsoft-thumbnail.jpg",
  },
];

export const HotDeal = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s: any, time: any, progress: any) => {
    /*@ts-ignore */
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    /*@ts-ignore */

    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <Container>
      <Box mt={5}>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="mySwiper"
          style={{ width: "100%", height: "auto" }}
        >
          {infoData.map((index, info) => {
            return (
              <SwiperSlide
                key={index.id}
                className="home_event_wrapper"
                style={{
                  width: "100%",
                  height: "550px",
                  backgroundImage: `url(${index.background})`,
                  backgroundSize: "cover",
                  borderRadius: "9px",
                }}
              >
                <Stack
                  className="event-info"
                  flexDirection={"column"}
                  alignItems={"center"}
                >
                  <Typography
                    variant="h5"
                    fontFamily={"sans-serif"}
                    style={{ marginTop: "20px", fontWeight: "bold" }}
                  >
                    {index.title}
                  </Typography>
                  <Stack flexDirection={"row"}>
                    <Box
                      maxWidth={"180px"}
                      maxHeight={"230px"}
                      sx={{
                        display: {
                          xs: "none",
                          sm: "none",
                          md: "flex",
                          lg: "flex",
                        },
                        background: "gray",
                        borderRadius: "9px",
                        margin: "30px",
                        color: "#fff",
                        boxShadow: "4px 6px 20px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <h3>{index.discount}</h3>
                    </Box>
                    <img
                      src={index.img}
                      alt=""
                      style={{
                        maxWidth: "150px",
                        maxHeight: "200px",
                        objectFit: "cover",
                        borderRadius: "9px",
                        marginTop: "30px",
                        marginRight: "50px",
                      }}
                    />
                  </Stack>
                  <Typography
                    variant="h5"
                    fontFamily={"sans-serif"}
                    style={{ marginTop: "50px", fontWeight: "bold" }}
                  >
                    Kuzatishda davom eting!
                  </Typography>
                </Stack>
              </SwiperSlide>
            );
          })}
          <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        </Swiper>
      </Box>
    </Container>
  );
};
