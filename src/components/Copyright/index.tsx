import React from 'react';

interface CopyrightProps {

}
const Copyright: React.FC<CopyrightProps> = (props) => {

  return (
    <div className="text-ant-text-secondary w-fit mx-auto">
      <p>
        地址：陕西省西安市咸宁西路28号 邮编710049
      </p>
      <p>
        版权所有：西安交通大学 站点建设与维护：网络信息中心{' '}
        <a className='text-ant-text-secondary' href="https://beian.miit.gov.cn" target="_blank">陕ICP备06008037号</a>
      </p>
    </div>
  )
}

export default Copyright;
