'use strict'

const TaskHook = exports = module.exports = {}
const Kue = use('Kue')
const Job = use('App/Jobs/NewTaskMail')
// const Mail = use('Mail')
// const Helpers = use('Helpers')
TaskHook.sendNewTaskMail = async (taskInstance) => {
    // dirty grava as alterações recentes
    if(!taskInstance.user_id && !taskInstance.dirty.user_id){
        return
    }

    // busca o usuario relacionado a tarefa
    const { email, username } = await taskInstance.user().fetch()
    // busca o arquivo relacionado a tarefa
    const file = await taskInstance.file().fetch()
    const { title } = taskInstance

    Kue.dispatch(Job.key, {email, username, file, title}, { attempts: 3 })

    // foi criado uma fila pra enviar o email
    // await Mail.send(
    //     ['emails.new_task'],
    //     { username, title, hasAttachment: !!file },
    //     message => {
    //         message
    //             .to(email)
    //             .from('pedroabdalla@outlook.com', 'Pedro Abdalla')
    //             .subject('Nova tarefa para você')
    //         if(file) {
    //             message.attach(Helpers.tmpPath(`uploads/${file.file}`), {
    //                 filename: file.name //troca o nome do arquivo
    //             })
    //         }
    //     }
    // )

}
