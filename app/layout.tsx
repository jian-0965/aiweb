import type { Metadata } from 'next';
export const metadata: Metadata = {title:'生长 BioGrow · 自适应生物学习实验室',description:'结合学习记录与个人自评的生物学习规划。'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="zh-CN"><body>{children}</body></html>;}
