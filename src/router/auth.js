import { auth } from '@/services/auth'

export async function authGuard(to, from, next) {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (await auth.checkAuth()) {
            next()
        } else {
            next('/admin/login')
        }
    } else {
        next()
    }
}