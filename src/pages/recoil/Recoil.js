import { atom } from "recoil";

export const CurrentImageState = atom({
    key:'CuurentImageState',
    default:[]
})

export const CurrentImageApi = atom({
    key:'CurrentImageApi',
    default:[]
})

export const CurrentCamFlag = atom({
    key:'camflag',
    default:false
})