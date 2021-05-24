using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoteHub.API
{
    public static class Constants
    {
        public const string DEFAULT_PASSWORD = "Ankara1.";
        public const string DEFAULT_EMAIL = "admin@example.com";
        public const string AUTH_SIGNING_KEY = "Y``SFASf____$aszxc13123-123*/,123zxZ";//ne istersek girebiliriz. İmzamız token için.
        public static class Roles
        {
            public const string ADMIN = "Admin";
        }
    }
}
