import { Charities } from "../model/charities_model";
import { isGetCharitiesResponse } from "../response/charities_response";
import { BaseAPIConfig, ContentType, HttpMethod } from "./base_http_request";
import { GenericHTTPRequest } from "./generic_http_request";

const URL = "/charities";

export class GetCharitiesRequest extends GenericHTTPRequest<Charities[]> {
  constructor() {
    const config: BaseAPIConfig = {
      method: HttpMethod.GET,
      contentType: ContentType.JSON,
      url: URL,
    };
    super(config, isGetCharitiesResponse);
  }
}
