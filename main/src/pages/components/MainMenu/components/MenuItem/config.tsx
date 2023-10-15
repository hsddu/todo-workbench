import { DoingIcon, DoneIcon } from "@/components/icon";
import { MENU_KEY } from '@/const/index'
const config = [
    {
        name: '进行中',
        key: MENU_KEY.DOING,
        count: 1,
        icon: () => <DoingIcon />
    },
    {
        name: '已完成',
        key: MENU_KEY.DONE,
        count: 10,
        icon: () => <DoneIcon />
    }
]

export default config;