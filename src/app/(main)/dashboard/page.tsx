import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'
import { cookies } from "next/headers"
import db from '@/lib/supabase/db'
import { redirect } from 'next/navigation'
import DashboardSetup from '@/components/dashboard-setup/dashboard-setup'

const DashboardPage = async () => {
    const supabase = createServerComponentClient({ cookies })
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return

    const workspace = await db.query.workspaces.findFirst({
        where: (workspace, { eq }) => eq(workspace.workspaceOwner, user.id)
    })

    if (!workspace) {
        return (
            <div className=' bg-background w-screen h-screen flex justify-center items-center ' >
                <DashboardSetup />
            </div>
        )
    }
    redirect(`/dashboard/${workspace.id}`)

    return (
        <div>DashboardPage</div>
    )
}

export default DashboardPage