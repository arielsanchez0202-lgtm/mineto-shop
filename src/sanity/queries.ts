import { defineQuery } from 'next-sanity'

export const PRODUCTS_QUERY = defineQuery(`*[_type == "product" && (!defined($categoria) || category == $categoria)]{
  _id,
  title,
  normalPrice,
  offerPrice,
  image,
  description,
  gallery,
  rating,
  reviewsCount,
  features,
  inStock,
  category
}`)

export const PRODUCT_BY_ID_QUERY = defineQuery(`*[_type == "product" && _id == $id][0]{
  _id,
  title,
  normalPrice,
  offerPrice,
  image,
  description,
  gallery,
  rating,
  reviewsCount,
  features,
  inStock
}`)

export const RELATED_PRODUCTS_QUERY = defineQuery(`*[_type == "product" && _id != $currentId][0...4]{
  _id,
  title,
  normalPrice,
  offerPrice,
  image,
  description,
  gallery,
  rating,
  reviewsCount,
  features,
  inStock
}`)