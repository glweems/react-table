using Microsoft.EntityFrameworkCore;

namespace react_table.Models
{
  public class UsersContext : DbContext
  {
    public UsersContext(DbContextOptions<UsersContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
  }
}