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
            <!-- 用户名 -->
            <el-form-item label="用户名" prop="name">
                <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 按钮 -->
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { login } from '@/service/index'
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
                    message: '请输入活动名称', 
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
        submitForm(formName){
            // 验证
            this.$refs[formName].validate((valid)=>{
                if(valid){
                    login({
                        name: this.ruleForm.name,
                        password: this.ruleForm.password
                    }).then(res=>{
                        if(res.code === 0){
                            localStorage.setItem("token",res.data.token);
                            this.$router.push({
                                name: 'home'
                            });
                        } else {
                            this.$message.error(res.mes);
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style lang="stylus">
.login-section
  padding 0px 20px
</style>
