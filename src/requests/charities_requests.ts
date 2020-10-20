import { Charities } from "../model/charities_model";
import { isGetCharitiesResponse } from "../response/charities_response";
import { BaseAPIConfig, ContentType, HttpMethod } from "./base_http_request";
import { GenericHTTPRequest } from "./generic_http_request";

const charitiesConfig: BaseAPIConfig = {
  method: undefined,
  contentType: ContentType.JSON,
  url: "/charities",
};

export class GetCharitiesRequest extends GenericHTTPRequest<Charities[]> {
  constructor() {
    const config = { ...charitiesConfig, method: HttpMethod.GET };
    super(config, isGetCharitiesResponse);
  }
}
