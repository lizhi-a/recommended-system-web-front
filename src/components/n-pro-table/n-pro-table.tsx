import React, { useState } from 'react';
import { ProTable, ProTableProps, ProFormInstance } from '@ant-design/pro-components'
import { useEffect, useRef } from 'react';
import dayjs, { Dayjs, isDayjs } from 'dayjs';

type ParamsType = Record<string, any>;

type ExtraProps = {
  syncToUrl?: boolean;
}

type NProTableType = <DataType extends Record<string, any>, Params extends ParamsType = ParamsType, ValueType = "text">(props: ProTableProps<DataType, Params, ValueType> & ExtraProps) => JSX.Element;

const INIT_CURRENT = 1
const INIT_PAGE_SIZE = 20

function parseUrlToObj(url: string): Record<string, any> {
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

export const NProTable: NProTableType = (props) => {
  const { onRow, className = '', request, syncToUrl = true, ...restProps } = props
  const extraClassName = !!onRow ? 'nroad-clicked-ant-table-row' : ''
  const innerFormRef = useRef<ProFormInstance>();
  const formRef = props?.formRef || innerFormRef;
  const [pagination, setPagination] = useState({ current: INIT_CURRENT, pageSize: INIT_PAGE_SIZE })

  // 把url上的值同步到表单和分页器
  const syncUrlToFormValueAndPagination = () => {
    if (!syncToUrl) {
      return
    }
    const queryObj = parseUrlToObj(window.location.href)
    Object.keys(queryObj).forEach(function (key) {
      if (queryObj[key] instanceof Array) {
        queryObj[key] = (queryObj[key] as string[]).map((item: string) => {
          if (item.startsWith('date%40')) {
            const valueWithSign = decodeURIComponent(item)
            const [, timeStamp] = valueWithSign.split('@')
            return dayjs(Number(timeStamp))
          }
          return decodeURIComponent(item)
        })
      } else {
        queryObj[key] = decodeURIComponent(queryObj[key] as string)
      }
    })
    formRef.current?.setFieldsValue(queryObj)
  }

  // 把表单和分页器的值同步到表单
  const syncFormValueAndPaginationToUrl = (current: number, pageSize: number) => {
    if (!syncToUrl) {
      return
    }
    const formValue = formRef?.current?.getFieldsValue();
    if (formValue) {
      const params: Record<string, string | string[]> = {}
      const keys = Object.keys(formValue)
      keys.forEach((k) => {
        const formValueItem = formValue[k];
        if (formValueItem) {
          if (Array.isArray(formValueItem) && isDayjs(formValueItem[0])) {
            params[k] = formValueItem.map((pitem) => `date@${(pitem as Dayjs).valueOf().toString()}`)
          } else if (isDayjs(formValueItem)) {
            params[k] = formValueItem.valueOf().toString();
          } else {
            params[k] = formValue[k]
          }
        }
      })
    }
  }


  const handleReset = () => {
    formRef.current?.resetFields();
    syncFormValueAndPaginationToUrl(INIT_CURRENT, INIT_PAGE_SIZE)
  }

  const handlePageChange = (current: number, pageSize: number) => {
    // 切换页后，滚动条回到顶部
    document.documentElement.scrollTo({
      top: 0,
    })
    setPagination({
      current,
      pageSize
    })
  }

  const requestFn: (typeof props)['request'] = (params, ...rest) => {
    if (request) {
      syncFormValueAndPaginationToUrl(params.current || 1, params.pageSize || 20)
      return request(params, ...rest);
    }
    return Promise.resolve({
      data: [],
      success: true,
      total: 0,
    })
  }

  useEffect(() => {
    syncUrlToFormValueAndPagination()
    formRef?.current?.submit()
  }, [])

  return (
    <ProTable
      formRef={formRef}
      pagination={{
        onChange: handlePageChange,
        showQuickJumper: true,
        current: pagination.current,
        pageSize: pagination.pageSize,
        showSizeChanger: true,
        pageSizeOptions: [10, 20, 30, 40, 50]
      }}
      request={requestFn}
      onReset={handleReset}
      onRow={onRow}
      rowClassName={`${extraClassName} ${className}`}
      {...restProps}
    />
  )
}

export default NProTable;