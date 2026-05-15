import { ImageResponse } from 'next/og'

// 路由段配置
export const runtime = 'edge'

// 图片元数据
export const contentType = 'image/png'
export const size = {
    width: 180,
    height: 180,
}

// 生成 Apple Touch Icon
export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 120,
                    background: 'linear-gradient(to right, #3b82f6, #10b981)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 700,
                    borderRadius: '22%',
                }}
            >
                H
            </div>
        ),
        {
            ...size,
        }
    )
} 