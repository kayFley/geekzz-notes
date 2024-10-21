'use client'

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useCoverImage } from '@/hooks/use-cover-image'
import { useEdgeStore } from '@/lib/edgestore'
import { cn } from '@/lib/utils'
import { useMutation } from 'convex/react'
import { ImagesIcon, XIcon } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Button } from './ui/button'

interface CoverProps {
	url?: string
	preview?: boolean
}
export const Cover = ({ url, preview }: CoverProps = {}) => {
	const { edgestore } = useEdgeStore()
	const params = useParams()
	const coverImage = useCoverImage()
	const removeCoverImage = useMutation(api.documents.removeCoverImage)

	const onRemoveCoverImage = async () => {
		if (url) {
			await edgestore.publicFiles.delete({ url: url })
		}
		removeCoverImage({
			id: params.documentId as Id<'documents'>,
		})
		coverImage.onClose()
	}

	return (
		<div
			className={cn(
				'relative w-full h-[34vh] group',
				!url && 'h-[12vh]',
				url && 'bg-muted'
			)}
		>
			{!!url && (
				<Image src={url} fill alt='Cover' className='object-cover' />
			)}
			{url && !preview && (
				<div className='absolute flex items-center opacity-0 group-hover:opacity-100 bottom-5 right-5 gap-x-2'>
					<Button
						onClick={() => coverImage.onReplace(url)}
						className='text-xs text-muted-foreground'
						variant='outline'
						size='sm'
					>
						<ImagesIcon className='w-4 h-4 text-muted-foreground' />
						Изменить обложку
					</Button>
					<Button
						onClick={onRemoveCoverImage}
						className='text-xs text-muted-foreground'
						variant='outline'
						size='sm'
					>
						<XIcon className='w-4 h-4 text-muted-foreground' />
						Удалить обложку
					</Button>
				</div>
			)}
		</div>
	)
}
