'use strict'

const Mail = use('Mail')
const Helpers = use('Helpers')

class NewTaskMail {

    // determina quantos jobs vai executar paralelamente
    static get concurrency () {
        return 1
    }


    static get key () {
        return 'NewTaskMail-job'
    }

    async handle ({ email, username, title, file }) {
        console.log('foi')
        await Mail.send(
            ['emails.new_task'],
            { username, title, hasAttachment: !!file },
            message => {
                message
                    .to(email)
                    .from('pedroabdalla@outlook.com', 'Pedro Abdalla')
                    .subject('Nova tarefa para você')
                if(file) {
                    message.attach(Helpers.tmpPath(`uploads/${file.file}`), {
                        filename: file.name //troca o nome do arquivo
                    })
                }
            }
        )
    }
}

module.exports = NewTaskMail

