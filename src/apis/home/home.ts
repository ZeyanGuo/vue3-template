import request from "@/utils/request";

interface HomeData {} // Definition of HomeData

export const getHomeData = (data: HomeData) => {
  request.get("url", data);
};
