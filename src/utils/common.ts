import { AxiosResponse } from 'axios';

export function parseUrlToObj(url: string): Record<string, any> {
  if (!url) {
    return {};
  }
  const res: Record<string, string | string[]> = {};
  const [, paramsStr] = url.split('?');
  if (paramsStr) {
    const kvArr = paramsStr.split('&');
    kvArr.forEach((kvStr) => {
      const [k, v] = kvStr.split('=');
      if (res[k]) {
        if (Array.isArray(res[k])) {
          (res[k] as string[]).push(v);
        } else {
          res[k] = [res[k], v] as string[];
        }
      } else {
        res[k] = v;
      }
    });
  }
  return res;
}

export function JsonParse<R = any>(str: string) {
  try {
    const res = JSON.parse(str) as R;
    return res
  } catch (error) {
    console.error('JSON解析错误, 您正在试图解析 ', str.toString())
    return undefined
  }
}


export function toNumber(value: any) {
  const res = Number(value);
  if (isNaN(res)) {
    return
  }
  return res
}

const myBrowserIsIE = (): boolean => {
  let isIE = false;
  if (!navigator) {
    return false;
  }
  if (navigator.userAgent.indexOf('compatible') > -1 && navigator.userAgent.indexOf('MSIE') > -1) {
    // ie浏览器
    isIE = true;
  }
  if (navigator.userAgent.indexOf('Trident') > -1) {
    // edge 浏览器
    isIE = true;
  }
  return isIE;
};

export function getFilenameFromAxiosResponse(response: AxiosResponse) {
  const disposition = response.headers['content-disposition'];
  if (disposition) {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(disposition);
    // eslint-disable-next-line eqeqeq
    if (matches != null && matches[1]) {
      const filename = matches[1].replace(/['"]/g, '');
      return filename;
    }
  }
  return '';
}

export interface FileInfo { fileName?: string, fileType?: string, blobType?: string }

export const downloadExcel = (
  data: AxiosResponse,
  options?: FileInfo,
): void => {
  const {
    fileName = '',
    fileType = 'xlsx',
    blobType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
  } = options || {};
  const blob = new Blob([data.data], { type: blobType });
  let fname = '';
  if (!fileName) {
    fname = getFilenameFromAxiosResponse(data);
  }
  if (myBrowserIsIE()) {
    // eslint-disable-next-line no-alert
    window.alert('求求你别用ie了😭，ie已经死了');
    (navigator as any).msSaveBlob(blob, fileName ? `${fileName}.${fileType}` : fname);
  } else {
    const downloadElement = document.createElement('a');
    const href = window.URL.createObjectURL(blob); // 创建下载的链接
    downloadElement.href = href;
    downloadElement.download = fileName ? `${fileName}.${fileType}` : fname; // 下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); // 点击下载
    document.body.removeChild(downloadElement); // 下载完成移除元素
    window.URL.revokeObjectURL(href); // 释放掉blob对象
  }
};

export function findItemFormList<T = Record<string, any>, V = string>(list: T[], key: keyof T, value: V): T | undefined {
  if (!list) {
    throw new Error('findItemFormList错误，您需要提供一个list')
  }
  if (!key) {
    throw new Error('findItemFormList错误，您需要提供一个key')
  }
  const target = list.find((item) => {
    if (item[key] === value) {
      return true
    }
    return false
  })
  return target
}
