import { Charities } from "../model/charities_model";

export function isGetCharitiesResponse(obj: any): obj is Charities[] {
  const result = obj as Charities[];
  return Array.isArray(result);
}
