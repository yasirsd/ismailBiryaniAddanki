// Centralised, clean-name re-exports for brand imagery. Adding new assets?
// Drop the file into this folder and expose it here with a semantic name so
// the rest of the codebase never has to reference paths with spaces or
// parentheses.

import brandLogoImg from './opt/logo.webp'
import founderLargeImg from './opt/founder-1536.webp'
import founderAvatarImg from './opt/founder-800.webp'
import branch960 from './opt/branch-960.webp'
import branch1200 from './opt/branch-1200.webp'
import branch1400 from './opt/branch-1400.webp'
import branch1672 from './opt/branch-1672.webp'
import proprietorPicImg from './opt/proprietor-480.webp'
import dining768 from './opt/dining-768.webp'
import dining1280 from './opt/dining-1280.webp'
import dining1920 from './opt/dining-1920.webp'
import lassiPicImg from './opt/lassi-960.webp'
import fryPicImg from './opt/fry-960.webp'
import nizamiPicImg from './opt/nizami-1600.webp'
import premiumPicImg from './opt/premium-1600.webp'

export const brandLogo = brandLogoImg
export const founderPic = founderLargeImg
export const founderAvatar = founderAvatarImg
export const founderSrcSet = `${founderAvatarImg} 800w, ${founderLargeImg} 1536w`
export const branchPic = branch1200
export const branchSrcSet = `${branch960} 960w, ${branch1200} 1200w, ${branch1400} 1400w, ${branch1672} 1672w`
export const proprietorPic = proprietorPicImg
export const diningPic = dining1280
export const diningSrcSet = `${dining768} 768w, ${dining1280} 1280w, ${dining1920} 1920w`

// Stand-ins for Unsplash files that now return 404. Not photographs of
// this restaurant's dishes.
export const lassiPic = lassiPicImg
export const fryPic = fryPicImg
export const nizamiPic = nizamiPicImg
export const premiumPic = premiumPicImg
