'use client';
import { Task } from '@/types';
import { format } from 'date-fns';
import { Pencil, Trash2, RefreshCw, Calendar, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

const statusStyles: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  IN_PROGRESS: 'bg-blue-100 text-blue-700',
  COMPLETED: 'bg-green-100 text-green-700',
};

const priorityStyles: Record<string, string> = {
  LOW: 'bg-gray-100 text-gray-600',
  MEDIUM: 'bg-orange-100 text-orange-600',
  HIGH: 'bg-red-100 text-red-600',
};

const statusLabel: Record<string, string> = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
};

export default function TaskCard({ task, onEdit, onDelete, onToggle }: TaskCardProps) {
  return (
    <div className={clsx('card p-5 transition-all hover:shadow-md', task.status === 'COMPLETED' && 'opacity-75')}>
      <div className="flex items-start justify-between gap-3">
        {/* Title + badges */}
        <div className="flex-1 min-w-0">
          <h3 className={clsx('font-semibold text-gray-900 truncate', task.status === 'COMPLETED' && 'line-through text-gray-400')}>
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{task.description}</p>
          )}

          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className={clsx('badge', statusStyles[task.status])}>
              {statusLabel[task.status]}
            </span>
            <span className={clsx('badge', priorityStyles[task.priority])}>
              <AlertCircle className="w-3 h-3 mr-1" />
              {task.priority}
            </span>
            {task.dueDate && (
              <span className="badge bg-gray-100 text-gray-600">
                <Calendar className="w-3 h-3 mr-1" />
                {format(new Date(task.dueDate), 'MMM d, yyyy')}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onToggle(task.id)}
            title="Toggle status"
            className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEdit(task)}
            title="Edit task"
            className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            title="Delete task"
            className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-3">
        Created {format(new Date(task.createdAt), 'MMM d, yyyy')}
      </p>
    </div>
  );
}
