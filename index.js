#! /usr/bin/env node
const program = require('commander');
const download = require('download-git-repo');
const inquirer = require('inquirer')

program.version('1.0.0', '-v, --version')
    .command('init <name>')
    .description('创建组件开发模板')
    .action((name) => {
        var config = {
            description: '',
            vue: false,
            react: false
        };
        var promps = [];
        if (!name) {
            promps.push({
                type: 'input',
                name: 'moduleName',
                message: '请输入模块名称',
                validate: function (input) {
                    if (!input) {
                        return '不能为空'
                    }
                    return true
                }
            })
        }
        if (config.description !== 'string') {
            promps.push({
                type: 'input',
                name: 'moduleDescription',
                message: '请输入模块描述'
            })
        }
        if (config.vue === false && config.react === false) {
            promps.push({
                type: 'list',
                name: 'moduleType',
                message: '初始化模板类型',
                choices: [
                    {
                        name: 'Vue',
                        value: 'vue'
                    },
                    {
                        name: 'React',
                        value: 'react'
                    }
                ]
            })
        }
        inquirer.prompt(promps).then(function (answers) {
            if (answers.moduleType === 'vue') {
                download('ZhangxxEye/vue-components-template', name, (err) => {
                    console.log(err ? err : '下载模板成功')
                })
            }
        });

    });
program.parse(process.argv);