import {post} from '../utils/fetch';
import * as cache from './cache';

import request from "../utils/request";

const updateFieldName = (data) => {
  // 将带下划线的属性转化为驼峰
  return Object.keys(data).reduce((a, b) => {
    const tempA = {...a};
    const tempB = b.replace(/_([\w+])/g, (all, letter) => {
      return letter.toUpperCase();
    });
    tempA[tempB] = data[b];
    return tempA;
  }, {});
};

// 保存项目
export const saveProject = (data) => {
  return request.post('/project/save', {data: data});
};

// 连接数据库

export const ping = (data) => {
  const projectId = cache.getItem('projectId');
  return request.post('/connector/ping', {data: {...updateFieldName(data), projectId}});
};

export const sqlexec = (data) => {
  const projectId = cache.getItem('projectId');
  return request.post('/connector/sqlexec', {data: {...updateFieldName(data), projectId}});
};


export const dbsync = (data) => {
  const projectId = cache.getItem('projectId');
  return request.post('/connector/dbsync', {data: {...updateFieldName(data), projectId}});
};

export const dbReverseParse = (data) => {
  const projectId = cache.getItem('projectId');
  return request.post('/connector/dbReverseParse', {data: {
    ...updateFieldName(data),
    projectId,
  }});
};

export const updateVersion = (data) => {
  const projectId = cache.getItem('projectId');
  return request.post('/connector/updateVersion', {data: {
    ...updateFieldName(data),
    projectId,
  }});
};

export const dbversion = (data) => {
  const projectId = cache.getItem('projectId');
  return request.post('/connector/dbversion', {data: {
    ...updateFieldName(data),
    projectId,
  }});
};

export const rebaseline = (data) => {
  const projectId = cache.getItem('projectId');
  return request.post('/connector/rebaseline', {data: {
    ...updateFieldName(data),
    projectId,
  }});
};

// 生成文档

export const gendocx = (data) => {
  const projectId = cache.getItem('projectId');
  return post('/connector/gendocx',
    {...data, projectId, imgext: '.png'},
    null,
    null,
    true);
};

// json 版本管理接口

export const hisProjectSave = (data) => {
  const projectId = cache.getItem('projectId');
  return request.post('/hisProject/save', {data: {
    ...data,
    projectId,
  }});
};

export const hisProjectLoad = () => {
  const projectId = cache.getItem('projectId');
  return request.get(`/hisProject/load/${projectId}`);
};

export const hisProjectDelete = (id) => {
  return request.post(`/hisProject/delete/${id}`);
};

export const hisProjectDeleteAll = () => {
  const projectId = cache.getItem('projectId');
  return request.post(`/hisProject/deleteAll/${projectId}`);
};

