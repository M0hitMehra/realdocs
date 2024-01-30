'use client'

import { AuthUser } from '@supabase/supabase-js'
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import EmojiPicker from '../global/emoji-picker'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'

interface DashboardSetupProps {
    user: AuthUser,
    subscription: {} | null
}

const DashboardSetup: React.FC<DashboardSetupProps> = ({ user, subscription }) => {
    const [selectedEmoji, setSelectedEmoji] = useState()
    const { register, handleSubmit, reset, formState: { isSubmitting: isLoading, errors } } = useForm({
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
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default DashboardSetup