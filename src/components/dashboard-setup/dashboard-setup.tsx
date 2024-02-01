'use client'

import { AuthUser } from '@supabase/supabase-js'
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import EmojiPicker from '../global/emoji-picker'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { Subscription } from '@/lib/supabase/supabase.types'
import { CreateWorkspaceFormSchema } from '@/lib/types'

interface DashboardSetupProps {
    user: AuthUser,
    subscription: Subscription | null
}

const DashboardSetup: React.FC<DashboardSetupProps> = ({ user, subscription }) => {
    const [selectedEmoji, setSelectedEmoji] = useState('💼')
    
    const { register, handleSubmit, reset, formState: { isSubmitting: isLoading, errors } } = useForm<z.infer<typeof CreateWorkspaceFormSchema>>({
        mode: "onChange",
        defaultValues: {
            logo: "",
            workspaceName: "",
        }
    })
    return (
        <Card className='w-[800px] h-screen sm:h-auto'>
            <CardHeader title="Dashboard">
                <CardTitle>Create A Workspace</CardTitle>
                <CardDescription>Lets create a private workspace to get you started. You can add collaborators later from the workspace settings tab</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={() => { }}>
                    <div className=' flex flex-col gap-4'>
                        <div className='flex items-center gap-4' >
                            <div className=' text-5xl'>
                                <EmojiPicker getValue={(emoji) => setSelectedEmoji(emoji)} >{selectedEmoji}</EmojiPicker>
                            </div>
                            <div className=' w-full'>
                                <Label className=' text-sm text-muted-foreground' htmlFor='workspaceName'>
                                    Name
                                </Label>
                                <Input id={'workspaceName'} placeholder='Workspace Name' type='text' disabled={isLoading} {...register('workspaceName', {
                                    required: "Workspace name is required"
                                })} />
                                <small className=' text-red-600'>
                                    {errors?.workspaceName?.message?.toString()}
                                </small>
                            </div>
                        </div>
                        <div>
                            <Label className=' text-sm text-muted-foreground' htmlFor='logo'>
                                Workspace Logo
                            </Label>
                            <Input id={'logo'} placeholder='Workspace Name' type='file' accept='image/*' disabled={isLoading || subscription?.status !== "active"} {...register('logo', {
                                required: "Workspace name is required"
                            })} />
                            <small className=' text-red-600'>
                                {errors?.logo?.message?.toString()}
                            </small>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default DashboardSetup