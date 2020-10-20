import { Charities } from "../model/charities_model";

export type GetCharitiesResponse = Charities[];

export function isGetCharitiesResponse(obj : any) : obj is GetCharitiesResponse{
    const result = obj as GetCharitiesResponse;
    return Array.isArray(result);
}