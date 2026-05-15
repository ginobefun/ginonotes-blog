import { ImageResponse } from 'next/og'
 
// 路由段配置
export const runtime = 'edge'
 
// 图片元数据
export const contentType = 'image/png'
 
// 生成图标的图像响应
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: '#000',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          borderRadius: '50%',
        }}
      >
        H
      </div>
    ),
    {
      width: 32,
      height: 32,
    }
  )
} 