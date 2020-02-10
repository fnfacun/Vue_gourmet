<template>
    <div class="login-section">
        <el-form 
            label-position="top"
            :rules="rules"
            :model="ruleForm" status-icon 
            ref="ruleForm" 
            label-width="100px" 
            class="demo-ruleForm"
        >
            <!-- 注册用户名 -->
            <el-form-item label="用户名" prop="name">
                <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 注册密码 -->
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 注册按钮 -->
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>

export default {
    data() {
        return {
            ruleForm: {
                name: '',
                password: ''
            },
            rules: {
                name: [{ 
                    required: true, 
                    message: '请输入注册的用户名', 
                    trigger: 'blur' 
                }],
                password: [{ 
                    required: true, 
                    message: '请输入密码', 
                    trigger: 'blur' 
                }]
            }
        };
    },
    methods: {
        submitForm(){

        },
        resetForm(){
            
        }
    }
}
</script>

<style lang="stylus">
.login-section
    padding 0px 20px
</style>
