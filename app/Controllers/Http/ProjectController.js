'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Project = use('App/Models/Project')

/**
 * Resourceful controller for interacting with projects
 */
class ProjectController {
    /**
     * Show a list of all projects.
     * GET projects
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index( { request } ) {
        const { page } = request.get()
        const projects = await Project.query()
            .with('user')
            .paginate(page)
        return projects
    }

    /**
     * Create/save a new project.
     * POST projects
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, auth }) {
        const data = request.only(['title', 'description'])
        const project = await Project.create({ ...data, user_id: auth.user.id})
        return project;
    }

    /**
     * Display a single project.
     * GET projects/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params }) {
        const project = await Project.findOrFail(params.id)
        await project.load('user')
        await project.load('task')
        return project;
    }

    /**
     * Update project details.
     * PUT or PATCH projects/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request }) {
        const project = await Project.findOrFail(params.id)
        const data = request.only(['title', 'description'])
        project.merge(data)
        await project.save()
        return project;
    }

    /**
     * Delete a project with id.
     * DELETE projects/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params }) {
        const project = await Project.findOrFail(params.id)
        await project.delete()
    }
}

module.exports = ProjectController
