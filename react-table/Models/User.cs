public partial class User
{
  public long Id { get; set; }
  public Address Address { get; set; }
  public Company Company { get; set; }
  public string Email { get; set; }
  public string Name { get; set; }
  public string Phone { get; set; }
  public string Username { get; set; }
  public string Website { get; set; }
}

public partial class Address
{
  public long Id { get; set; }
  public string City { get; set; }
  public Geo Geo { get; set; }
  public string State { get; set; }
  public string Street { get; set; }
  public string Suite { get; set; }
  public string Zipcode { get; set; }
}

public partial class Geo
{
  public long Id { get; set; }
  public string Lat { get; set; }
  public string Lng { get; set; }
}

public partial class Company
{
  public long Id { get; set; }
  public string Bs { get; set; }
  public string CatchPhrase { get; set; }
  public string Name { get; set; }
}