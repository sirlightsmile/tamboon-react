import { GetCharitiesResponse, isGetCharitiesResponse } from "../response/charities_response";
import { BaseAPIConfig, ContentType, GenericHTTPRequest, HttpMethod } from "./http_request";

const URL = "/charities";

export class GetCharitiesRequest extends GenericHTTPRequest<GetCharitiesResponse>{
    constructor() {
        const config : BaseAPIConfig = {
            method: HttpMethod.GET,
            contentType: ContentType.JSON,
            url: URL
        }
        super(config, isGetCharitiesResponse);
      }
}