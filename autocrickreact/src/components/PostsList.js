import React, { Component } from "react";
import { posts_list_by_user } from "../services/api";
import { FaEdit, FaTrash } from "react-icons/fa";
import HeaderBar from "../includes/header";
import Footer from "../includes/footer";
import Sidebar from "../includes/sidebar";
import Post from "../components/post_form";
import "../assets/styles.css";
import "../assets/tableStyling.css";

export default class PostsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      redirectToPost: false,
      postId: null,
    };
  }

  async componentDidMount() {
    try {
      const posts = await posts_list_by_user(localStorage.getItem("username"));
      this.setState({ posts });
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  }

  handleEdit = (row) => {
    this.setState({
      redirectToPost: true,
      postId: row._id,
    });
  };

  handleDelete = (row) => {};

  render() {
    const { posts, redirectToPost, postId } = this.state;
    if (redirectToPost) {
      return <Post _id={postId} />;
    }
    return (
      <div>
        <HeaderBar />
        <div style={styles.container}>
          <Sidebar />
          <div style={styles.containerMain}>
            <div className="page-container">
              <div className="content-wrap">
                <div className="table-info">
                  <h2 className="table-title">Available Posts</h2>
                  <p className="table-description">
                    Showing {posts.length} posts
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    padding: "20px",
                    boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
                    borderRadius: "10px",
                    marginBottom: "20px",
                    width: "100%",
                    maxWidth: "500px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <table className="table centered smaller">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.map((post, index) => {
                        return (
                          <tr key={post._id}>
                            <td>{index + 1}</td>
                            <td>{post.title}</td>
                            <td>{post.title}</td>
                            <td>
                              <button
                                className="edit-button"
                                onClick={() => this.handleEdit(post)}
                              >
                                <FaEdit />
                              </button>
                              <button
                                className="delete-button"
                                onClick={() => this.handleDelete(post)}
                              >
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  containerMain: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};
