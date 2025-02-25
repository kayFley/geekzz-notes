'use client'

import { BlockNoteEditor, PartialBlock } from '@blocknote/core'
import '@blocknote/core/fonts/inter.css'
import { BlockNoteView } from '@blocknote/mantine'
import '@blocknote/mantine/style.css'
import { useBlockNote } from '@blocknote/react'
import { useTheme } from 'next-themes'

import { useEdgeStore } from '@/lib/edgestore'

interface EditorProps {
	onChange: (value: string) => void
	initialContent?: string
	editable?: boolean
}

export default function Editor({
	onChange,
	initialContent,
	editable,
}: EditorProps) {
	const { resolvedTheme } = useTheme()
	const { edgestore } = useEdgeStore()

	const handleUpload = async (file: File) => {
		const res = await edgestore.publicFiles.upload({
			file,
		})

		return res.url
	}

	const editor: BlockNoteEditor = useBlockNote({
		editable,
		initialContent: initialContent
			? (JSON.parse(initialContent) as PartialBlock[])
			: undefined,
		uploadFile: handleUpload,
	})

	const handleChange = () => {
		onChange(JSON.stringify(editor.topLevelBlocks, null, 2))
	}

	return (
		<div>
			<BlockNoteView
				editor={editor}
				theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
				onChange={handleChange}
			/>
		</div>
	)
}
