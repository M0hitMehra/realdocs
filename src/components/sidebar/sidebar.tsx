import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import React from 'react'
import { cookies } from 'next/headers';
import { getUserSubscriptionStatus } from '@/lib/supabase/queries';
import { redirect } from 'next/navigation';

interface SidebarProps {
    params: { workspaceId: string };
    className?: string;
}

const Sidebar: React.FC<SidebarProps> = async ({ params, className }) => {
    const supabase = createServerComponentClient({ cookies })
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return

    const { data: subscriptionData, error: subscriptionError } = await getUserSubscriptionStatus(user.id)
    const { data: workspaceFolderData, error: foldersError } = await getFolders(params.workspaceId)

    if (subscriptionError || foldersError) redirect('/dashboard')

    return (
        <div>Sidebar</div>
    )
}

export default Sidebar