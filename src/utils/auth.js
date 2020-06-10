/*
 * **************************************************************************************
 *  Copyright © 2014-2020 Ontology Foundation Ltd.
 *  All rights reserved.
 *
 *  This software is supplied only under the terms of a license agreement,
 *  nondisclosure agreement or other written agreement with Ontology Foundation Ltd.
 *  Use, redistribution or other disclosure of any parts of this
 *  software is prohibited except in accordance with the terms of such written
 *  agreement with Ontology Foundation Ltd. This software is confidential
 *  and proprietary information of Ontology Foundation Ltd.
 *
 * **************************************************************************************
 *
 */

const LoginKey = 'token'

const storage =
  process.env.NODE_ENV !== 'production' ? localStorage : sessionStorage

export function getToken() {
  return storage.getItem(LoginKey)
}

export function setToken(token) {
  return storage.setItem(LoginKey, token)
}

export function setNews(name, data) {
  return storage.setItem(name, data)
}
export function getNews(name) {
  return storage.getItem(name)
}
export function removeNews(name) {
  return storage.removeItem(name)
}
export function clear() {
  return storage.clear()
}
export function removeToken() {
  return storage.removeItem(LoginKey)
}
