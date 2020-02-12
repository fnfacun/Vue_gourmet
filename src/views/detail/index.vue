<template>
    <div class="menu-detail">
        <detailHeader :info="menuInfo"></detailHeader>
        <detailContent :info="menuInfo"></detailContent>
        <detailComment :info="menuInfo"></detailComment>
    </div>
</template>

<script>
import detailHeader from './detail-header'
import detailContent from './detail-content'
import detailComment from './detail-comment'
import { menuInfo } from '@/service/index';

export default {
    components: {
        detailHeader, 
        detailContent, 
        detailComment
    },
    data(){
        return {
            menuInfo: {
                userInfo: {},
                raw_material: {
                    main_material: [],
                    accessories_material: []
                },
                steps: []
            }
        }
    },
    watch: {
        $route: {
            async handler(){
                let { menuId } = this.$route.query;
                let res = await menuInfo({ menuId })
                if(menuId){
                    if(res.code === 0) {
                        this.menuInfo = res.data.info;
                        console.log(this.menuInfo)
                    }
                } else {
                    this.$message({
                        message: '请重新进入',
                        type: 'warning'
                    });
                }
            },
            immediate: true
        }
    }
}
</script>
