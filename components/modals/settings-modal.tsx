'use client'

import { useSettings } from '@/hooks/use-settings'
import { ModeToggle } from '../mode-toggle'
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog'
import { Label } from '../ui/label'

export const SettingsModal = () => {
	const settings = useSettings()

	return (
		<Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
			<DialogContent>
				<DialogHeader>
					<h2 className='text-lg font-medium'>Настройки</h2>
				</DialogHeader>
				<div className='flex items-center justify-between'>
					<div className='flex flex-col gap-y-1'>
						<Label>Внешний вид</Label>
						<span className='text-sm text-muted-foreground'>
							Настройте внешний вид своего устройства
						</span>
					</div>
					<ModeToggle />
				</div>
			</DialogContent>
		</Dialog>
	)
}
