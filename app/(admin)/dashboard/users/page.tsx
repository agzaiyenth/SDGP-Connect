'use client';

import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useAddUser, useEditUser, useDeleteUser, useFetchUsers, User } from '@/hooks/user';
import { useCurrentUser } from '@/hooks/auth/useCurrentUser';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

// Form validation schema for creating/editing users
const userFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
  role: z.enum(['ADMIN', 'MODERATOR', 'DEVELOPER']),
});

type UserFormValues = z.infer<typeof userFormSchema>;

const roles = ['ADMIN', 'MODERATOR', 'DEVELOPER'] as const;

export default function UserManagement() {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [sortColumn, setSortColumn] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [createDialog, setCreateDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Authentication and user role check
  const { isAdmin } = useCurrentUser();

  // Fetch users
  const { users, loading: loadingUsers, error: fetchError, refetch } = useFetchUsers();

  // User operations hooks
  const { addUser, loading: addingUser } = useAddUser();
  const { editUser, loading: editingUser } = useEditUser();
  const { deleteUser, loading: deletingUser } = useDeleteUser();
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: '',
      password: '',
      role: 'DEVELOPER',
    },
  });

 



  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };
  const handleCreate = async (data: UserFormValues) => {
    if (!isAdmin) {
      toast.error('Only administrators can create users');
      return;
    }

    const result = await addUser(data as any);
    if (result) {
      setCreateDialog(false);
      form.reset();
      refetch(); // Refresh the users list
    }
  };

  const handleEdit = async (data: UserFormValues) => {
    if (!isAdmin || !currentUser) {
      toast.error('Only administrators can edit users');
      return;
    }

    const updateData = {
      user_id: currentUser.user_id,
      ...data
    };

    // If password is empty, delete it from the payload
    if (!updateData.password) {
      delete updateData.password;
    }

    const result = await editUser(updateData);
    if (result) {
      setEditDialog(false);
      form.reset();
      refetch(); // Refresh the users list
    }
  };

  const handleDelete = async (userId: string) => {
    if (!isAdmin) {
      toast.error('Only administrators can delete users');
      return;
    }

    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      const success = await deleteUser(userId);
      if (success) {
        refetch(); // Refresh the users list
      }
    }
  };
  const handleBulkDelete = async () => {
    if (!isAdmin) {
      toast.error('Only administrators can delete users');
      return;
    }

    const confirmed = window.confirm('Are you sure you want to delete these users?');
    if (!confirmed) return;

    let success = true;

    // Delete users one by one
    for (const userId of selectedUsers) {
      const result = await deleteUser(userId);
      if (!result) {
        success = false;
      }
    }

    if (success) {
      toast.success('Selected users deleted successfully');
    } else {
      toast.error('Some users could not be deleted');
    }

    setSelectedUsers([]);
    refetch(); // Refresh the users list
  };

  const handleBulkRoleUpdate = async (role: string) => {
    if (!isAdmin) {
      toast.error('Only administrators can update user roles');
      return;
    }

    let success = true;

    // Update user roles one by one
    for (const userId of selectedUsers) {
      const userData = {
        user_id: userId,
        role: role as 'ADMIN' | 'MODERATOR' | 'DEVELOPER'
      };

      const result = await editUser(userData);
      if (!result) {
        success = false;
      }
    }

    if (success) {
      toast.success('User roles updated successfully');
    } else {
      toast.error('Some user roles could not be updated');
    }

    setSelectedUsers([]);
    refetch(); // Refresh the users list
  };  const filteredUsers = users
    .filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(user => !roleFilter || user.role === roleFilter)
    .sort((a, b) => {
      const aValue = a[sortColumn as keyof User];
      const bValue = b[sortColumn as keyof User];
      return sortDirection === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });

  return (
    <div className="space-y-6">      <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground">Manage user accounts and roles</p>
      </div>
      <Button
        onClick={() => {
          if (!isAdmin) {
            toast.error('Only administrators can create users');
            return;
          }
          setCreateDialog(true);
        }}
        disabled={!isAdmin}
      >
        Create User
      </Button>
    </div>



      <div className="rounded-md border">
        <Table>
          <TableHeader><TableRow>              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort('name')}
              >
                Name {sortColumn === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort('role')}
              >
                Role {sortColumn === 'role' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort('createdAt')}
              >
                Created At {sortColumn === 'createdAt' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow></TableHeader>
          <TableBody>
            {loadingUsers ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                <LoadingSpinner/>
              </TableCell>
            </TableRow>
          ) : filteredUsers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            filteredUsers.map((user) => (
              <TableRow key={user.user_id}>                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    <Badge variant={
                    user.role === 'ADMIN'
                        ? 'default'
                        : 'secondary'
                  }>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  {format(new Date(user.createdAt), 'd MMM yyyy')}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={!isAdmin}
                      onClick={() => {                        setCurrentUser(user);
                        form.reset({
                          name: user.name,
                          password: '',
                          role: user.role as any,
                        });
                        setEditDialog(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={!isAdmin}
                      onClick={() => handleDelete(user.user_id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
          </TableBody>
        </Table>
      </div>

      {/* Create User Dialog */}
      <Dialog open={createDialog} onOpenChange={setCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create User</DialogTitle>
            <DialogDescription>
              Add a new user to the system
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>            <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCreateDialog(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" >
                  Create User
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={editDialog} onOpenChange={setEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Modify user details
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEdit)} className="space-y-4">              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password (leave blank to keep current)</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditDialog(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" >
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}