"use client";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Button,
  CircularProgress,
  Pagination,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import useAuthAdminStore from "@/store/AuthAdminStore";

const BlogList = () => {
  const router = useRouter();

  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const token = useAuthAdminStore();
  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  const fetchBlogs = useCallback(
    async (page = 1) => {
      try {
        setLoading(true);
        const res = await axios.get(`${apiURL}/blog?page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogs(res.data.data);
        setCurrentPage(res.data.currentPage);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
        setSnackbar({
          open: true,
          message: "Failed to fetch blogs.",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    },
    [apiURL, token],
  );

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [fetchBlogs, currentPage]);

  const handleEdit = (id) => {
    router.push(`/admin/dashboard/blogs/${id}`);
  };

  const handleDeleteClick = (id) => {
    setSelectedBlogId(id);
    setDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5050/api/blog/${selectedBlogId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSnackbar({
        open: true,
        message: "Blog deleted successfully!",
        severity: "success",
      });
      fetchBlogs(currentPage);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to delete blog.",
        severity: "error",
      });
    } finally {
      setDialogOpen(false);
      setSelectedBlogId(null);
    }
  };

  const handlePageChange = (_, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="shadow rounded-lg p-10">
      <Link
        href="/admin/dashboard/blogs/create"
        className={"flex justify-center"}
      >
        <Button variant={"outlined"}>Create A Blog</Button>
      </Link>

      <h1 className="border-l-4  mb-6 pl-2 text-lg font-semibold">Blog List</h1>
      {loading ? (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ tableLayout: "fixed" }} aria-label="blogs table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "5%" }}>#</TableCell>
                <TableCell sx={{ width: "65%" }}>Title</TableCell>
                <TableCell sx={{ width: "10%" }}>Author</TableCell>
                <TableCell sx={{ width: "20%" }} align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blogs.map((blog, index) => (
                <TableRow key={blog._id}>
                  <TableCell>{index + 1 + (currentPage - 1) * 10}</TableCell>
                  <TableCell>{blog.name}</TableCell>
                  <TableCell>{blog.author}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(blog._id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(blog._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination */}
      <Stack spacing={2} className="mt-4 items-center">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>

      {/* Delete Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this blog?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </div>
  );
};

export default BlogList;
