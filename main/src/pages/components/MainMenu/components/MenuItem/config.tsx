import { DoingIcon, DoneIcon } from "@/components/icon";
import { MENU_KEY } from '@/const/index'
const config = [
    {
        name: '进行中',
        key: MENU_KEY.DOING,
        countKey: 'doing',
        icon: () => <DoingIcon />
    },
    {
        name: '已完成',
        key: MENU_KEY.DONE,
        countKey: 'done',
        icon: () => <DoneIcon />
    }
]

export default config;