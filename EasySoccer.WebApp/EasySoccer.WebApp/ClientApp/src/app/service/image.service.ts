import { Injectable } from "@angular/core";
import { Soccerpitch } from "../model/soccerpitch";

@Injectable({
  providedIn: "root",
})
export class ImageService {
  constructor() {}

  getImageUrlBySoccerPitch(soccerPitch: Soccerpitch) {
    let selectedImageUrl = "";
    selectedImageUrl =
      "https://easysoccer.blob.core.windows.net/soccerpitch/default.png";
    if (soccerPitch.imageName != null) {
      selectedImageUrl =
        "https://easysoccer.blob.core.windows.net/soccerpitch/" +
        soccerPitch.imageName;
    }
    return selectedImageUrl;
  }

  getImageUrlByImageName(imageName: string, container: string) {
    let selectedImageUrl = "";
    selectedImageUrl =
      "https://easysoccer.blob.core.windows.net/" + container + "/default.png";
    if (imageName != null) {
      selectedImageUrl =
        "https://easysoccer.blob.core.windows.net/" +
        container +
        "/" +
        imageName;
    }
    return selectedImageUrl;
  }
}
