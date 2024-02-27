import { Module } from '@nestjs/common'
import { PomodoroController } from './Pomodoro.controller'
import { PrismaService } from 'src/prisma.service'
import { PomodoroService } from './Pomodoro.service'

@Module({
	controllers: [PomodoroController],
	providers: [PomodoroService, PrismaService],
	exports: [PomodoroService],
})
export class PomodoroModule {}
